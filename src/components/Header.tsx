import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type User = {
  name: string;
  email: string;
  role: 'user' | 'admin';
} | null;

type HeaderProps = {
  user: User;
  onLogin: () => void;
  onAdminLogin: () => void;
  onLogout: () => void;
};

export default function Header({ user, onLogin, onAdminLogin, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TeleHub
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Button onClick={onLogin} variant="outline">Войти</Button>
                <Button onClick={onAdminLogin} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Админ
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                  {user.role === 'admin' && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">👑 Админ</Badge>
                  )}
                </div>
                <Button onClick={onLogout} variant="outline" size="sm">
                  <Icon name="LogOut" size={16} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
