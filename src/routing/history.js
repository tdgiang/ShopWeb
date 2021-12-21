import { createBrowserHistory } from "history";

const history = createBrowserHistory();
history.listen(() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}));

export default history;