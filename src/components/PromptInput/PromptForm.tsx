import { Form, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Insira um prompt',
  }),
});

const PromptForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem>
              <div className='h-5'>
                <FormMessage />
              </div>
              <FormControl>
                <div className='flex flex-col bg-[#464646] gap-2 rounded-2xl p-2'>
                  <Textarea
                    {...field}
                    placeholder='Fale algo para o Trainify!'
                    className='w-[50rem] h-[5rem] bg-[#464646] text-white border-0 rounded-2xl resize-none p-4 pr-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-700 outline-none shadow-none'
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    type='submit'
                    size='icon'
                    className='bg-[#464646] hover:bg-[#5a5a5a] text-white self-end shadow-none'
                    disabled={isSubmitting}
                  >
                    <Send className='h-4 w-4' />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export { PromptForm };
