import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

function compare(a, b) {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
}

const UserDisplay = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer tok_123abc`,
      },
    }).then((res) => res.data)
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {data.sort(compare).map((user) => (
        <li>{`${user.name}: ${user.score}`}</li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDisplay />
    </QueryClientProvider>
  );
}
