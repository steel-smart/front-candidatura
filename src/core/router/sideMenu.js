export default [
  {
    title: "DashBoard",
    route: "/dashboard",
    permissao: "paginainicial",
    iconClass: "fas fa-chalkboard-teacher",
  },
  {
    title: "Gerenciamento",
    route: null,
    permissao: "ra_Empresa",
    iconClass: "fas fa-cogs",
    subItems: [
    

      {
        title: "Usuarios",
        route: "/usarios",
        permissao: "admin",
      },
    ],
  },

];
