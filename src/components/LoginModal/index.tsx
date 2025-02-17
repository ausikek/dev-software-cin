'use client';

import React, { useState } from 'react';
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
  icon?: React.ReactNode;
}

export function LoginModal({ triggerText = 'Log in', icon }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

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
