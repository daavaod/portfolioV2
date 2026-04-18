import { ThemeProvider } from "@/components/theme/theme-provider";
// router
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    // queryClient,
  },
  // defaultNotFoundComponent: NotFoundContent,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolioV2-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
