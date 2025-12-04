import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

type HomePageProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  topChannels: Channel[];
  recentChannels: Channel[];
  categories: string[];
  setSelectedChannel: (channel: Channel) => void;
};

export default function HomePage({ 
  searchQuery, 
  setSearchQuery, 
  topChannels, 
  recentChannels, 
  categories, 
  setSelectedChannel 
}: HomePageProps) {
  return (
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
  );
}
