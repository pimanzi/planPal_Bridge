import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function AvatarUi() {
  return (
    <Avatar>
      <AvatarImage
        className="hidden xsPhone:inline-block"
        src="user.jpeg"
        alt="@shadcn"
      />
    </Avatar>
  );
}
