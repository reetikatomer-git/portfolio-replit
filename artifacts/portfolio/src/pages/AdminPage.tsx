import { useEffect, useState } from 'react';
import { setAuthTokenGetter, useAdminLogin, useListAdminQueries, useToggleQueryReplied, getListAdminQueriesQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { LogOut, CheckCircle2, Circle, Mail, Phone, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
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

  const { data: queries, isLoading, isError } = useListAdminQueries({
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
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        
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
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border/50 focus-visible:ring-primary/50 text-center text-lg py-6"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                className="w-full py-6 text-base shadow-[0_0_15px_rgba(14,165,233,0.1)] hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]"
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
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 fixed pointer-events-none"></div>
      
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-serif font-bold text-white tracking-wide">
              Queries Dashboard
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p>Loading queries...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive border border-destructive/20 bg-destructive/5 rounded-lg max-w-2xl mx-auto">
            <p>Failed to load queries. Your session might have expired.</p>
            <Button variant="outline" className="mt-4 border-destructive/30" onClick={handleLogout}>
              Login again
            </Button>
          </div>
        ) : queries?.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border rounded-xl bg-secondary/10">
            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary/50">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-serif font-medium text-white mb-2">No queries yet</h2>
            <p className="text-muted-foreground">Share your portfolio link to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queries?.map((query, idx) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className={`h-full flex flex-col bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${query.replied ? 'border-green-500/30 bg-green-950/10' : 'border-border hover:border-primary/50'}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white capitalize leading-tight mb-1">{query.name}</h3>
                        <p className="text-sm text-primary font-medium">{query.profile}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider whitespace-nowrap bg-secondary/50 px-2 py-1 rounded">
                        {format(new Date(query.createdAt!), 'd MMM yy, h:mm a')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4 pb-4">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <a href={`mailto:${query.email}`} className="flex items-center gap-2 hover:text-white transition-colors group">
                        <Mail size={14} className="group-hover:text-primary transition-colors" />
                        <span className="truncate">{query.email}</span>
                      </a>
                      <a href={`tel:${query.mobile}`} className="flex items-center gap-2 hover:text-white transition-colors group">
                        <Phone size={14} className="group-hover:text-primary transition-colors" />
                        <span>{query.mobile}</span>
                      </a>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-md flex-1 border border-border/30 overflow-hidden">
                      <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                        {query.queryText}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant={query.replied ? "outline" : "default"}
                      className={`w-full justify-center ${
                        query.replied 
                          ? "border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300" 
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                      onClick={() => handleToggleReplied(query.id)}
                      disabled={toggleRepliedMutation.isPending}
                    >
                      {query.replied ? (
                        <>
                          <CheckCircle2 size={16} className="mr-2" />
                          Replied ✓
                        </>
                      ) : (
                        <>
                          <Circle size={16} className="mr-2 opacity-50" />
                          Mark as Replied
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
