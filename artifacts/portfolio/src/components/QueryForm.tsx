import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitQuery } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const queryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  profile: z.string().min(1, 'Profile is required'),
  mobile: z.string().min(1, 'Mobile is required'),
  email: z.string().email('Valid email required'),
  queryText: z.string().min(10, 'Please describe in at least 10 characters'),
});

type QueryFormValues = z.infer<typeof queryFormSchema>;

export default function QueryForm() {
  const { toast } = useToast();
  const submitQuery = useSubmitQuery();

  const form = useForm<QueryFormValues>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      name: '',
      profile: '',
      mobile: '',
      email: '',
      queryText: '',
    },
  });

  function onSubmit(data: QueryFormValues) {
    submitQuery.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: 'Query Submitted',
            description: "Thanks for reaching out! I'll get back to you soon.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Something went wrong. Please try again later.',
          });
        },
      }
    );
  }

  return (
    <section id="query" className="py-24 md:py-32 relative bg-background border-t border-border">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Got a Role or a Product Challenge?
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
              Share your requirements below and I'll get back to you. Let's discuss how we can build something impactful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-10 shadow-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-secondary/30 border-border focus-visible:ring-primary/50 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Your Profile / Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Head of Engineering at Acme Corp"
                            className="bg-secondary/30 border-border focus-visible:ring-primary/50 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 000-0000"
                            className="bg-secondary/30 border-border focus-visible:ring-primary/50 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@acmecorp.com"
                            className="bg-secondary/30 border-border focus-visible:ring-primary/50 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="queryText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Job Description / Product Requirement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, tech stack, or product challenge you'd like me to look at..."
                          className="min-h-[120px] bg-secondary/30 border-border focus-visible:ring-primary/50 text-white resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitQuery.isPending}
                  className="w-full md:w-auto mt-4 px-8 py-6 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] group text-base"
                >
                  {submitQuery.isPending ? (
                    <span className="flex items-center gap-2">
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send to Reetika
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
