import { LogOut } from 'lucide-react';
import ChatButton from '../ChatButton';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    toast.success('Usuário Deslogado com sucesso');

    redirect('/');
  };

  return (
    <ChatButton variant='button' onClick={handleLogout}>
      <LogOut />
      Sair
    </ChatButton>
  );
}
