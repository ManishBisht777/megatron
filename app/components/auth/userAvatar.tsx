import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Icons } from "../ui/icons";

interface userAvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar = ({ user, ...props }: userAvatarProps) => {
  return (
    <div {...props}>
      {user.image ? (
        <Image
          className="rounded-full"
          width={30}
          height={30}
          src={user.image}
          alt="profile image"
        />
      ) : (
        <Icons.user className="h-4 w-4" />
      )}
    </div>
  );
};

export default UserAvatar;
