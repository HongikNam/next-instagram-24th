import Avatar from "@/components/ui/Avatar";
import Icon, { type IconName } from "@/components/ui/Icon";
import { currentUser } from "@/mocks/users";
import SidebarItem from "./SidebarItem";

const menuItems: { icon: IconName; label: string; active?: boolean }[] = [
  { icon: "home", label: "홈" },
  { icon: "reels", label: "릴스" },
  { icon: "share", label: "메시지" },
  { icon: "search", label: "검색" },
  { icon: "heart", label: "알림" },
  { icon: "plus", label: "만들기" },
];

export default function Sidebar() {
  return (
    <aside
      aria-label="사이드바"
      className={[
        "group/sidebar fixed inset-y-0 left-0 z-50",
        "flex h-dvh w-[72px] flex-col overflow-x-hidden overflow-y-auto",
        "bg-surface px-3 py-4 text-text-primary",
        "transition-[width] duration-200 motion-reduce:transition-none",
        "hover:w-sidebar",
      ].join(" ")}
    >
      <div
        aria-label="Instagram"
        role="img"
        className="flex h-12 shrink-0 items-center px-2"
      >
        <span className="inline-flex size-8 items-center justify-center">
          <Icon name="instagram" />
        </span>
      </div>

      <ul
        aria-label="주 메뉴"
        className="mt-[clamp(24px,6vh,64px)] flex shrink-0 flex-col gap-1"
      >
        {menuItems.map(({ icon, label, active }) => (
          <SidebarItem
            key={icon}
            icon={<Icon name={icon} filled={active} />}
            label={label}
            active={active}
          />
        ))}
        <SidebarItem
          icon={<Avatar src={currentUser.avatarUrl} alt="" size="sm" />}
          label="프로필"
        />
      </ul>

      <ul
        aria-label="추가 메뉴"
        className="mt-auto flex shrink-0 flex-col gap-2 pt-6"
      >
        <SidebarItem icon={<Icon name="menu" />} label="더 보기" />
        <SidebarItem icon={<Icon name="apps" />} label="Meta의 다른 앱" />
      </ul>
    </aside>
  );
}
