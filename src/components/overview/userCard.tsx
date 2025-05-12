import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface UserCardProps {
  name: string;
  rol: string;
  image: string;
  variant?: 'top' | 'left' | 'bottom';
}

const UserCard = ({ name, rol, image, variant = 'top' }: UserCardProps) => {
  const imagePosition = {
    top: 'flex-col items-center',
    left: 'flex-row items-center',
    bottom: 'flex-col-reverse items-center',
  }[variant];

  return (
    <section className="w-full max-w-xs">
      <div className={cn('flex gap-4', imagePosition)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} alt={name} className="" />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">{name}</h2>
          <Badge variant="outline" className="mt-1">
            {rol}
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default UserCard;
