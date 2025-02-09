'use client';

import { useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import ChatButton from '../ChatButton';
import { Brain } from 'lucide-react';

interface LoginModalProps {
  triggerText?: string;
  icon?: ReactNode;
}

export function LoginModal({ triggerText, icon }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ChatButton variant='button'>
          {icon}
          {triggerText}
        </ChatButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <Brain />
          <DialogTitle>Entrar</DialogTitle>
          <DialogDescription>
            Insira as credenciais da sua conta.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
