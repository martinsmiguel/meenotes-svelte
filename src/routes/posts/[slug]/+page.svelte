<script lang="ts">
  import type { PostData } from './+page.server.ts';

  export let data: PostData;
</script>

<article>
  <header>
    <h1>{data.title}</h1>
    <p>{data.date}</p>
  </header>

  <main>    
    {@html data.content}
  </main>
</article>

<style>
  article {
    font-family: sans-serif;
    line-height: 1.7;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  header {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }
  h1 {
    margin: 0;
  }
  header p {
    margin: 0.5rem 0 0 0;
    color: #666;
  }
  :global(main h2) {
    margin-top: 2rem;
  }
  :global(main p) {
    margin-bottom: 1rem;
  }
  :global(main pre) {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }
</style>
