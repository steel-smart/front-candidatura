export default [

    

    {
        title: "Permissoes",
        botoes: [
            {
                title: "Criar",
                route: "/createRule",
                permissao: "c_Role",
            },
            {
                title: "Listar",
                route: "/permissoes",
                permissao: "ra_Role",
            },
        ]
    },
    {
        title: "Empresa",
        botoes: [
            {
                title: "Criar",
                route: "/createEmpresa",
                permissao: "ra_empresa",
            },
            {
                title: "Listar",
                route: "/empresa",
                permissao: "ra_empresa",
            },
        ]
    },
    

];
