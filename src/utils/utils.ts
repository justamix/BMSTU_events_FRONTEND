export const isHomePage = (path: string) => {
    return path === "/";
  };
export const isClassroomPage = (path: string) => {
    return path.match(/^\/classrooms\/(\d+)/);
  };
export const isEditPage = (path: string) => {
    return path.match(/^\/users\/\d+\/edit$/);
  };  
export const isMyEventsPage = (path: string) => {
    return path === "/my_events";
  };
export const isProfilePage = (path: string) => {
    return path === "/profile";
  };
export const isDraftEventPage = (path: string) => {
    return path === "/draft_event";
  };
  