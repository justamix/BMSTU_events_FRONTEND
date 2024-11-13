export const isHomePage = (path:string) => {
	return path == "/"
}

export const isClassroomPage = (path:string) => {
    return path.match(/^\/classrooms\/(\d+)/)
}