export default function DetailsProductPage() {
  const posts = [
    {
      id: 1,
      title: "Titolo post 1",
      content: "Contenuto post 1",
    },
    {
      id: 2,
      title: "Titolo post 2",
      content: "Contenuto post 2",
    },
    {
      id: 3,
      title: "Titolo post 3",
      content: "Contenuto post 3",
    },
    {
      id: 4,
      title: "Titolo post 4",
      content: "Contenuto post 4",
    },
    {
      id: 5,
      title: "Titolo post 5",
      content: "Contenuto post 5",
    },
  ];

  const postsMap = posts.map((post) => (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <h6>{post.content}</h6>
    </li>
  ));

  return (
    <>
      <main>
        <ul className="my-5">{postsMap}</ul>
      </main>
    </>
  );
}
