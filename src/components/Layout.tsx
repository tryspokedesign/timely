import { AppShell, Navbar, Header, Text, UnstyledButton, Group } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconClock, IconClipboardList, IconUsers, IconFolder } from '@tabler/icons-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
}

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavLink = ({ icon, label, to, active }: NavLinkProps) => (
  <UnstyledButton
    component={Link}
    to={to}
    className={`w-full p-3 rounded-md transition-colors ${
      active ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
    }`}
  >
    <Group>
      {icon}
      <Text size="sm">{label}</Text>
    </Group>
  </UnstyledButton>
);

export function Layout({ children, userRole }: LayoutProps) {
  const location = useLocation();

  const employeeLinks = [
    { icon: <IconClock size={20} />, label: 'Add Log', to: '/add-log' },
    { icon: <IconClipboardList size={20} />, label: 'My Logs', to: '/my-logs' },
  ];

  const managerLinks = [
    { icon: <IconFolder size={20} />, label: 'Projects', to: '/projects' },
    { icon: <IconUsers size={20} />, label: 'Employees', to: '/employees' },
    { icon: <IconClipboardList size={20} />, label: 'All Logs', to: '/all-logs' },
  ];

  const links = userRole === 'manager' ? managerLinks : employeeLinks;

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          {links.map((link) => (
            <NavLink
              key={link.to}
              {...link}
              active={location.pathname === link.to}
            />
          ))}
        </Navbar>
      }
      header={
        <Header height={60} p="xs" className="flex items-center">
          <Text size="xl" weight={700}>
            ⏱️ Timely
          </Text>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
} 