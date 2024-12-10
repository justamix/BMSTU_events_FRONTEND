export const isHomePage = (path:string) => {
	return path == "/"
}

export const isClassroomPage = (path:string) => {
    return path.match(/^\/classrooms\/(\d+)/)
}
// export const getCsrfToken = (): string | undefined => {
//     const csrfToken = document.cookie
//         .split(';')
//         .find((cookie) => cookie.trim().startsWith('csrftoken='))
//         ?.split('=')[1];
//     return csrfToken;
// };