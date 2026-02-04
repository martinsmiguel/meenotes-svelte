<script lang="ts">
  export let data: { posts: Post[] };

  interface Post {
    slug: string;
    title: string;
    date: string;
    summary: string;
  }
</script>

<main>
  <h1>Meenotes Miguel Martins</h1>
  <p>Bem-vindo ao meu repositório de conhecimento!</p>

  <section>
    <h2>Posts Recentes</h2>
    {#if data.posts}
      <ul>
        {#each data.posts as post (post.slug)}
          <li>
            <a href="/posts/{post.slug}">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <small>{post.date}</small>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>Nenhum post encontrado.</p>
    {/if}
  </section>
</main>

<style>
  main {
    font-family: sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  a:hover {
    text-decoration: underline;
  }
  h3 {
    margin: 0 0 0.5rem 0;
  }
  p {
    margin: 0 0 0.5rem 0;
  }
  small {
    color: #666;
  }
</style>