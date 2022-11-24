const getters = {
    sidebar: (state) => state.app.sidebar,
    language: (state) => state.app.language,
    size: (state) => state.app.size,
    device: (state) => state.app.device,
    visitedViews: (state) => state.tagsView.visitedViews,
    cachedViews: (state) => state.tagsView.cachedViews,
    token: (state) => state.permission.token,
    avatar: (state) => state.permission.avatar,
    name: (state) => state.permission.name,
    roles: (state) => state.permission.roles,
    role: (state) => state.permission.role,
    login_id: (state) => state.permission.id,
    permission_routes: (state) => state.permission.routes,
    errorLogs: (state) => state.errorLog.logs
};

export default getters;
