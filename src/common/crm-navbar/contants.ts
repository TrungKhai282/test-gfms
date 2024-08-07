export const menuData = [
  {
    id: 1,
    accessLink: "/",
    menuCode: "DASHBOARD",
    menuName: "Dashboard",
    children: [],
    menuOrder: 0,
  },
  {
    id: 2,
    accessLink: null,
    menuCode: "WORKFLOW",
    menuName: "Workflow",
    menuOrder: 1,
    children: [
      {
        id: 3,
        accessLink: "/workflow",
        menuCode: "WORKFLOW",
        menuName: "Danh sách",
        children: [],
        menuOrder: 1,
      },
      {
        id: 4,
        accessLink: "/workflow/create",
        menuCode: "WORKFLOW_CREATE",
        menuName: "Tạo quy trình",
        children: [],
        menuOrder: 1,
      },
    ],
  },
];
