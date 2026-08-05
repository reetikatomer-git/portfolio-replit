import { useEffect, useState, useMemo } from 'react';
import {
  setAuthTokenGetter,
  useAdminLogin,
  useListAdminQueries,
  useToggleQueryReplied,
  getListAdminQueriesQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  LogOut, CheckCircle2, Circle, Mail, Phone, ArrowLeft, Loader2,
  ChevronsUpDown, ChevronUp, ChevronDown, Search, X,
} from 'lucide-react';
import { Link } from 'wouter';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Query = {
  id: number;
  name: string;
  profile: string;
  mobile: string;
  email: string;
  queryText: string;
  replied: boolean;
  createdAt: string | null;
};

const columnHelper = createColumnHelper<Query>();

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ChevronUp size={14} className="ml-1 inline text-primary" />;
  if (sorted === 'desc') return <ChevronDown size={14} className="ml-1 inline text-primary" />;
  return <ChevronsUpDown size={14} className="ml-1 inline opacity-30" />;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const loginMutation = useAdminLogin();
  const toggleRepliedMutation = useToggleQueryReplied();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAuthTokenGetter(() => localStorage.getItem('adminToken'));
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const { data: queries = [], isLoading, isError } = useListAdminQueries({
    query: {
      queryKey: getListAdminQueriesQueryKey(),
      enabled: isAuthenticated,
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { data: { password } },
      {
        onSuccess: (result) => {
          localStorage.setItem('adminToken', result.token);
          setAuthTokenGetter(() => result.token);
          setIsAuthenticated(true);
          toast({ title: 'Logged in successfully' });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Authentication Failed',
            description: 'Invalid password. Please try again.',
          });
        },
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAuthTokenGetter(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const handleToggleReplied = (id: number) => {
    toggleRepliedMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdminQueriesQueryKey() });
          toast({ title: 'Query status updated' });
        },
      }
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: (info) =>
          info.getValue() ? format(new Date(info.getValue()!), 'd MMM yy, h:mm a') : '—',
        sortingFn: 'datetime',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => <span className="font-semibold text-white capitalize">{info.getValue()}</span>,
        filterFn: 'includesString',
      }),
      columnHelper.accessor('profile', {
        header: 'Profile',
        cell: (info) => <span className="text-primary text-sm">{info.getValue()}</span>,
        filterFn: 'includesString',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className="flex items-center gap-1 hover:text-primary transition-colors group">
            <Mail size={13} className="shrink-0 opacity-50 group-hover:opacity-100" />
            <span className="truncate max-w-[160px]">{info.getValue()}</span>
          </a>
        ),
        filterFn: 'includesString',
        enableSorting: false,
      }),
      columnHelper.accessor('mobile', {
        header: 'Mobile',
        cell: (info) => (
          <a href={`tel:${info.getValue()}`} className="flex items-center gap-1 hover:text-primary transition-colors group">
            <Phone size={13} className="shrink-0 opacity-50 group-hover:opacity-100" />
            {info.getValue()}
          </a>
        ),
        enableColumnFilter: false,
        enableSorting: false,
      }),
      columnHelper.accessor('queryText', {
        header: 'Query',
        cell: (info) => (
          <p className="text-sm text-white/80 max-w-xs line-clamp-2">{info.getValue()}</p>
        ),
        filterFn: 'includesString',
        enableSorting: false,
      }),
      columnHelper.accessor('replied', {
        header: 'Status',
        cell: (info) =>
          info.getValue() ? (
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30">
              <CheckCircle2 size={12} className="mr-1" /> Replied
            </Badge>
          ) : (
            <Badge variant="outline" className="text-yellow-400 border-yellow-500/40">
              <Circle size={12} className="mr-1 opacity-60" /> Pending
            </Badge>
          ),
        filterFn: (row, _colId, filterValue) => {
          if (filterValue === 'all') return true;
          if (filterValue === 'replied') return row.original.replied;
          if (filterValue === 'pending') return !row.original.replied;
          return true;
        },
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => (
          <Button
            size="sm"
            variant={info.row.original.replied ? 'outline' : 'default'}
            className={`whitespace-nowrap ${
              info.row.original.replied
                ? 'border-green-500/40 text-green-400 hover:bg-green-500/10'
                : ''
            }`}
            onClick={() => handleToggleReplied(info.row.original.id)}
            disabled={toggleRepliedMutation.isPending}
          >
            {info.row.original.replied ? 'Mark Pending' : 'Mark Replied'}
          </Button>
        ),
      }),
    ],
    [toggleRepliedMutation.isPending]
  );

  const table = useReactTable({
    data: queries as Query[],
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
    globalFilterFn: 'includesString',
  });

  const repliedFilter = (columnFilters.find((f) => f.id === 'replied')?.value as string) ?? 'all';

  const setRepliedFilter = (value: string) => {
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== 'replied'),
      ...(value !== 'all' ? [{ id: 'replied', value }] : []),
    ]);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        <Card className="w-full max-w-md bg-card/80 border-border/50 backdrop-blur-xl relative z-10 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 mx-auto">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Link>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-2">Protected area. Please log in.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50 border-border/50 focus-visible:ring-primary/50 text-center text-lg py-6"
                autoFocus
              />
              <Button
                type="submit"
                className="w-full py-6 text-base"
                disabled={loginMutation.isPending || !password}
              >
                {loginMutation.isPending ? 'Authenticating...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 fixed pointer-events-none" />

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-serif font-bold text-white tracking-wide">Queries Dashboard</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p>Loading queries...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive border border-destructive/20 bg-destructive/5 rounded-lg max-w-2xl mx-auto">
            <p>Failed to load queries. Your session might have expired.</p>
            <Button variant="outline" className="mt-4 border-destructive/30" onClick={handleLogout}>Login again</Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {/* Global search */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search all columns…"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9 pr-8 bg-secondary/40 border-border/50 focus-visible:ring-primary/50 h-9 text-sm"
                />
                {globalFilter && (
                  <button onClick={() => setGlobalFilter('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Name filter */}
              <div className="relative">
                <Input
                  placeholder="Filter name…"
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                  className="bg-secondary/40 border-border/50 focus-visible:ring-primary/50 h-9 text-sm w-36"
                />
              </div>

              {/* Profile filter */}
              <div className="relative">
                <Input
                  placeholder="Filter profile…"
                  value={(table.getColumn('profile')?.getFilterValue() as string) ?? ''}
                  onChange={(e) => table.getColumn('profile')?.setFilterValue(e.target.value)}
                  className="bg-secondary/40 border-border/50 focus-visible:ring-primary/50 h-9 text-sm w-36"
                />
              </div>

              {/* Status filter */}
              <div className="flex gap-1 bg-secondary/30 border border-border/50 rounded-md p-1">
                {['all', 'pending', 'replied'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRepliedFilter(v)}
                    className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${
                      repliedFilter === v
                        ? 'bg-primary text-primary-foreground shadow'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <span className="ml-auto text-xs text-muted-foreground">
                {table.getFilteredRowModel().rows.length} of {queries.length} queries
              </span>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border/50 overflow-auto bg-card/40 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="border-b border-border/50 bg-secondary/20">
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap select-none"
                          style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                        >
                          {header.isPlaceholder ? null : (
                            <span
                              className={header.column.getCanSort() ? 'cursor-pointer hover:text-white transition-colors' : ''}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                <SortIcon sorted={header.column.getIsSorted()} />
                              )}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-16 text-muted-foreground">
                        No queries match the current filters.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row, i) => (
                      <tr
                        key={row.id}
                        className={`border-b border-border/30 transition-colors hover:bg-secondary/20 ${
                          row.original.replied ? 'bg-green-950/10' : ''
                        } ${i % 2 === 0 ? '' : 'bg-secondary/5'}`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3 text-muted-foreground align-top">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {table.getPageCount() > 1 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-8 text-xs">
                    Previous
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-8 text-xs">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
