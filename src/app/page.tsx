'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Home() {
  const role = useSelector((state: RootState) => state.crm.userRole);
  const router = useRouter();

  useEffect(() => {
    if (role === 'Madelynn') router.replace('/overview');
    else if (role === 'Client A') router.replace('/executive-dashboard');
    else router.replace('/my-tasks');
  }, [role, router]);

  return null;
}
