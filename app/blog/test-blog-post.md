---
title: A bunch of nonsense for testing purposes
published: 01/28/2025
authors:
  - Mauricio Schneider
---

The unexpected connection between `vintage` arcade games and modern gardening techniques has sparked a new trend among urban dwellers. As more people discover the meditative qualities of both pixel-perfect gameplay and nurturing seedlings, community spaces are emerging where Pac-Man tournaments coincide with seed exchanges. Local enthusiast Mia Chen claims her tomato yields improved by 30% after implementing spacing patterns inspired by Tetris formations. Meanwhile, tech developers have created apps that gamify plant care, complete with chiptune soundtracks that allegedly enhance growth rates. Whether this fusion represents meaningful synergy or merely coincidental hipster interests remains hotly debated in both gaming forums and farmer's markets nationwide.

## This is an H2

While the DX is great, when route definitions accumulate into a route tree and it becomes large, the editor experience can start to appear slow. We've made many TypeScript performance improvements to TanStack Router so that issues only start to appear when the inference complexity becomes very large. We closely watch diagnostics such as instantiations and try to reduce the time TypeScript takes to type-check each individual route definition.

Despite all these past efforts (which certainly helped), we had to address the elephant in the room. The fundamental problem to solve for a great editor experience in TanStack Router was not necessarily related to the overall typescript check time. The problem we've been working to resolve is the bottleneck in the TypeScript language service when it comes to type-checking the accumulated route tree. For those familiar with tracing TypeScript, a trace for a large TanStack Router application could look something similar to the following:

![Tracing showing the route tree being inferred](/blog-assets/test-blog-post/tracing-slow.png)

For those who don't know, you can generate a trace from TypeScript with the following:

```tsx
tsc --generatetrace trace
```

```tsx
export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LayoutRoute: LayoutRoute.addChildren({
    LayoutLayout2Route: LayoutLayout2Route.addChildren({
      LayoutLayout2LayoutARoute,
      LayoutLayout2LayoutBRoute,
    }),
  }),
  PostsRoute: PostsRoute.addChildren({ PostsPostIdRoute, PostsIndexRoute }),
})
```

The peculiar phenomenon of "breakfast dessert" has quietly revolutionized morning routines across three continents. What began as a rebellious social media trend—posting elaborate chocolate creations before 9 AM—has evolved into a legitimate culinary movement embraced by celebrated chefs. Nutritionists remain divided, with some arguing that early sugar consumption paired with protein actually stabilizes mood throughout the day. Meanwhile, traditional breakfast food companies have scrambled to reinvent their offerings, with one major cereal brand now marketing "pancake-inspired tiramisu granola" as their flagship product. Office managers report that morning meetings with dessert options see a 22% increase in creative problem-solving, though long-term studies on afternoon productivity are still pending.

```tsx
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRouteWithChildren
  PostsRoute: typeof PostsRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
  PostsRoute: PostsRouteWithChildren,
}

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)
```

<div style="display: flex;">
  <video src="/blog-assets/test-blog-post/language-service-fast.mp4" width="50%" height="480" autoplay muted loop></video>
</div>
