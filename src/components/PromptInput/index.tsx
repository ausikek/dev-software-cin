import type { KeyboardEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface PromptInputProps {
  isSubmitting: boolean;
  onSubmit: (prompt: string) => Promise<void>;
}

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Insira um prompt',
  }),
});

export default function PromptInput({
  isSubmitting,
  onSubmit,
}: PromptInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data.prompt);
    form.reset();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
}
