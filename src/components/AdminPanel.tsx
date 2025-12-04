import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

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

type AdminPanelProps = {
  mockChannels: Channel[];
  categories: string[];
};

export default function AdminPanel({ mockChannels, categories }: AdminPanelProps) {
  return (
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
  );
}
