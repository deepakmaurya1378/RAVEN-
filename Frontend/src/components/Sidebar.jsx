import { useEffect, useState, useMemo } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import clsx from "clsx";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const UserItem = ({ user, isSelected, onSelect, isOnline }) => (
  <button
    key={user._id}
    onClick={() => onSelect(user)}
    className={clsx(
      "w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors",
      { "bg-base-300 ring-1 ring-base-300": isSelected }
    )}
  >
    <div className="relative mx-auto lg:mx-0">
      <img
        src={user.profilePic || "/avatar (1).png"}
        alt={user.name}
        className="size-12 object-cover rounded-full"
        loading="lazy"
      />
      {isOnline && (
        <span
          className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
        />
      )}
    </div>
    <div className="hidden lg:block text-left min-w-0">
      <div className="font-medium truncate">{user.fullName}</div>
      <div className="text-sm text-zinc-400">{isOnline ? "Online" : "Offline"}</div>
    </div>
  </button>
);

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers().catch((err) => console.error("Failed to fetch users:", err));
  }, [getUsers]);

  // Filter users based on search query and online status
  const filteredUsers = useMemo(() => {
    let filtered = showOnlineOnly
      ? users.filter((user) => onlineUsers.includes(user._id))
      : users;

    if (searchQuery.trim()) {
      filtered = filtered.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [users, onlineUsers, showOnlineOnly, searchQuery]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <header className="border-b border-base-300 w-full p-5 sticky top-0 ">
        <div className="flex align-center items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-zinc-500 size-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-full pl-10 border-base-300 focus:border-base-content"
            />
          </div>
        </div>
        <div className="mt-5 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </header>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            isSelected={selectedUser?._id === user._id}
            onSelect={setSelectedUser}
            isOnline={onlineUsers.includes(user._id)}
          />
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {searchQuery
              ? "No users match your search"
              : showOnlineOnly
              ? "No online users"
              : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;