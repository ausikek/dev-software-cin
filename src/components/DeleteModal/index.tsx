import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteModalProps {
  chatId: string;
}

export function DeleteModal({ chatId }: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteWorkout = async (chatId: string) => {
    setDeleting(true);
    await fetch(`/api/chats/${chatId}`, {
      method: 'DELETE',
    });
    setDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <X className='h-3 w-3' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Deletar Chat</DialogTitle>
          <DialogDescription>
            Tem certeza que quer deletar o chat?
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end gap-2'>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => deleteWorkout(chatId)}
            className='bg-red-600 hover:bg-red-800'
            disabled={deleting}
          >
            {deleting ? 'Deletando...' : 'Deletar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
