import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Header from '@/components/Header';
import AdminPanel from '@/components/AdminPanel';
import UserDashboard from '@/components/UserDashboard';
import HomePage from '@/components/HomePage';

type Channel = {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  subscribers: number;
  views: number;
  link: string;
  image: string;
  isPremium: boolean;
  isTop: boolean;
};

const mockChannels: Channel[] = [
  { id: '1', name: 'IT Новости', description: 'Актуальные новости мира технологий', category: '💻 Технологии', city: 'Москва', subscribers: 125000, views: 4523, link: 't.me/itnews', image: '', isPremium: true, isTop: true },
  { id: '2', name: 'Путешествия PRO', description: 'Лучшие места для путешествий', category: '✈️ Путешествия', city: 'Санкт-Петербург', subscribers: 89000, views: 3201, link: 't.me/travelPRO', image: '', isPremium: true, isTop: true },
  { id: '3', name: 'Финансы и инвестиции', description: 'Аналитика и советы по инвестициям', category: '💰 Финансы', city: 'Москва', subscribers: 156000, views: 5412, link: 't.me/finance_invest', image: '', isPremium: false, isTop: true },
  { id: '4', name: 'Кулинарный блог', description: 'Рецепты на каждый день', category: '🍳 Кулинария', city: 'Казань', subscribers: 67000, views: 2890, link: 't.me/cook_blog', image: '', isPremium: false, isTop: false },
  { id: '5', name: 'Спортивные события', description: 'Все о спорте и здоровье', category: '⚽ Спорт', city: 'Екатеринбург', subscribers: 94000, views: 3567, link: 't.me/sport_events', image: '', isPremium: true, isTop: true },
  { id: '6', name: 'Бизнес идеи', description: 'Идеи для стартапов и бизнеса', category: '💼 Бизнес', city: 'Москва', subscribers: 112000, views: 4123, link: 't.me/business_ideas', image: '', isPremium: false, isTop: true },
];

const categories = ['💻 Технологии', '✈️ Путешествия', '💰 Финансы', '🍳 Кулинария', '⚽ Спорт', '💼 Бизнес', '🎨 Дизайн', '📚 Образование'];

export default function Index() {
  const [user, setUser] = useState<{ name: string; email: string; role: 'user' | 'admin' } | null>(null);
  const [myChannels, setMyChannels] = useState<Channel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isAddChannelOpen, setIsAddChannelOpen] = useState(false);

  const handleLogin = () => {
    setUser({ name: 'Иван Иванов', email: 'ivan@example.com', role: 'user' });
    toast.success('Вы успешно вошли в систему');
  };

  const handleAdminLogin = () => {
    setUser({ name: 'Админ', email: 'admin@example.com', role: 'admin' });
    toast.success('Вход в админ-панель выполнен');
  };

  const handleLogout = () => {
    setUser(null);
    toast.info('Вы вышли из системы');
  };

  const handleAddChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      city: formData.get('city') as string,
      subscribers: parseInt(formData.get('subscribers') as string) || 0,
      views: 0,
      link: formData.get('link') as string,
      image: '',
      isPremium: false,
      isTop: false,
    };
    setMyChannels([...myChannels, newChannel]);
    setIsAddChannelOpen(false);
    toast.success('Канал отправлен на модерацию');
  };

  const topChannels = mockChannels.filter(c => c.isTop).slice(0, 12);
  const recentChannels = mockChannels.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <Header 
        user={user}
        onLogin={handleLogin}
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {user?.role === 'admin' ? (
          <AdminPanel mockChannels={mockChannels} categories={categories} />
        ) : user ? (
          <UserDashboard 
            myChannels={myChannels}
            categories={categories}
            isAddChannelOpen={isAddChannelOpen}
            setIsAddChannelOpen={setIsAddChannelOpen}
            handleAddChannel={handleAddChannel}
          />
        ) : (
          <HomePage 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            topChannels={topChannels}
            recentChannels={recentChannels}
            categories={categories}
            setSelectedChannel={setSelectedChannel}
          />
        )}
      </main>

      <Dialog open={!!selectedChannel} onOpenChange={() => setSelectedChannel(null)}>
        <DialogContent className="max-w-2xl">
          {selectedChannel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedChannel.name}
                  {selectedChannel.isPremium && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">🔥 TOP</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>{selectedChannel.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{selectedChannel.category}</Badge>
                  <Badge variant="outline">{selectedChannel.city}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Подписчиков</p>
                    <p className="text-2xl font-bold">👥 {selectedChannel.subscribers.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Просмотров</p>
                    <p className="text-2xl font-bold">👁️ {selectedChannel.views.toLocaleString()}</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Перейти в Telegram
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
