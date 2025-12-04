import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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
                  <Button onClick={handleLogin} variant="outline">Войти</Button>
                  <Button onClick={handleAdminLogin} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <Icon name="LogOut" size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user?.role === 'admin' ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">👑 Админ-панель</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,234</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Radio" size={20} />
                    Каналы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">567</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    Просмотры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">89.5K</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    На модерации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="moderation" className="space-y-4">
              <TabsList>
                <TabsTrigger value="moderation">Модерация</TabsTrigger>
                <TabsTrigger value="users">Пользователи</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
                <TabsTrigger value="banners">Баннеры</TabsTrigger>
              </TabsList>

              <TabsContent value="moderation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Очередь на модерацию</CardTitle>
                    <CardDescription>Новые каналы ожидают проверки</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockChannels.slice(0, 3).map((channel) => (
                        <div key={channel.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <h4 className="font-semibold">{channel.name}</h4>
                            <p className="text-sm text-muted-foreground">{channel.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{channel.category}</Badge>
                              <Badge variant="outline">{channel.city}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Icon name="Check" size={16} />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление пользователями</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Иван Иванов', 'Мария Петрова', 'Алексей Сидоров'].map((name, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{name}</p>
                              <p className="text-sm text-muted-foreground">user@example.com</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Изменить роль</Button>
                            <Button size="sm" variant="destructive">Заблокировать</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление категориями</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((cat, idx) => (
                        <div key={idx} className="p-4 border rounded-lg flex items-center justify-between hover:shadow-md transition-shadow">
                          <span>{cat}</span>
                          <Button size="sm" variant="ghost">
                            <Icon name="Pencil" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="banners" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Рекламные баннеры</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mb-4">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить баннер
                    </Button>
                    <div className="text-center text-muted-foreground py-8">
                      Баннеры не добавлены
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : user ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мои каналы</h2>
              <Dialog open={isAddChannelOpen} onOpenChange={setIsAddChannelOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить канал
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Добавить новый канал</DialogTitle>
                    <DialogDescription>Канал будет отправлен на модерацию</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddChannel} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Название канала</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" name="description" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Категория</Label>
                        <Select name="category" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="city">Город</Label>
                        <Input id="city" name="city" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="link">Ссылка на канал</Label>
                        <Input id="link" name="link" placeholder="t.me/channel" required />
                      </div>
                      <div>
                        <Label htmlFor="subscribers">Подписчиков</Label>
                        <Input id="subscribers" name="subscribers" type="number" required />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddChannelOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Отправить на модерацию
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {myChannels.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="Radio" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">У вас пока нет каналов</p>
                  <Button onClick={() => setIsAddChannelOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Добавить первый канал
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myChannels.map((channel) => (
                  <Card key={channel.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{channel.name}</CardTitle>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          На модерации
                        </Badge>
                      </div>
                      <CardDescription>{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="secondary">{channel.category}</Badge>
                        <Badge variant="outline">{channel.city}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>👥 {channel.subscribers.toLocaleString()}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <section className="text-center py-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Каталог Telegram-каналов
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Найдите лучшие каналы по вашим интересам
              </p>
              <div className="max-w-2xl mx-auto relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск каналов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg shadow-lg"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  🔥 ТОП-12 каналов
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topChannels.map((channel) => (
                  <Card
                    key={channel.id}
                    className={`hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 ${
                      channel.isPremium ? 'border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' : ''
                    }`}
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{channel.name}</CardTitle>
                        {channel.isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">🔥 TOP</Badge>
                        )}
                      </div>
                      <CardDescription>{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary">{channel.category}</Badge>
                        <Badge variant="outline">{channel.city}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">👥 {channel.subscribers.toLocaleString()}</span>
                        <span className="text-muted-foreground">👁️ {channel.views.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">🆕 Недавно добавленные</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentChannels.map((channel) => (
                  <Card
                    key={channel.id}
                    className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <CardHeader>
                      <CardTitle className="text-base">{channel.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="text-xs">{channel.category}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">📂 Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(0, 8).map((category, idx) => (
                  <Card
                    key={idx}
                    className="text-center p-6 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50"
                  >
                    <p className="text-3xl mb-2">{category.split(' ')[0]}</p>
                    <p className="font-semibold">{category.split(' ').slice(1).join(' ')}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
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
