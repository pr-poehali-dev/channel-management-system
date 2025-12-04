import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSettings from '@/components/ProfileSettings';

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

type User = {
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type UserDashboardProps = {
  user: User;
  myChannels: Channel[];
  categories: string[];
  isAddChannelOpen: boolean;
  setIsAddChannelOpen: (open: boolean) => void;
  handleAddChannel: (e: React.FormEvent<HTMLFormElement>) => void;
  onUpdateProfile: (name: string, email: string) => void;
  onChangePassword: (oldPassword: string, newPassword: string) => void;
};

export default function UserDashboard({ 
  user,
  myChannels, 
  categories, 
  isAddChannelOpen, 
  setIsAddChannelOpen, 
  handleAddChannel,
  onUpdateProfile,
  onChangePassword
}: UserDashboardProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs defaultValue="channels" className="w-full">
        <TabsList>
          <TabsTrigger value="channels">Мои каналы</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="profile">
          <ProfileSettings 
            user={user}
            onUpdateProfile={onUpdateProfile}
            onChangePassword={onChangePassword}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}