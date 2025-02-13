'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import ChatButton from '../ChatButton';

interface LoginModalProps {
  triggerText?: string;
}

export function LoginModal({ triggerText = 'Log in' }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  console.log(mode);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ChatButton variant='button'>{triggerText}</ChatButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Entrar' : 'Registrar'}</DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Insira as credenciais para acessar sua conta.'
              : 'Vamos criar a sua conta.'}
          </DialogDescription>
        </DialogHeader>
        {mode === 'login' ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} setMode={setMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
