'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Dumbbell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { LoginModal } from '../LoginModal';

export function SelectScrollable() {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <Select>
        <SelectTrigger className='w-[13rem] h-[2.5rem] rounded-3xl bg-[#464646] hover:bg-[#464646]/90 text-white border-0'>
          <div className='flex flex-row items-center gap-2 pl-10'>
            <Dumbbell width={20} height={20} />
            Meus treinos
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='vvzn'>Vovozinha</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return <LoginModal triggerText='Meus treinos' icon={<Dumbbell />} />;
}
