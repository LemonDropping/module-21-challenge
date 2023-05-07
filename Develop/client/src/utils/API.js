const API_BASE_URL = '/graphql';

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching GraphQL data: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`Error in GraphQL response: ${errors.map(error => error.message).join(', ')}`);
  }

  return data;
}

export async function getMe() {
  const query = `
    query {
      me {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          title
          description
          image
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data.me;
}
export async function searchGoogleBooks(query) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve Google Books results.');
  }
  return response.json();
}

export async function saveBook(bookData) {
  const query = `
    mutation {
      saveBook(input: {
        bookId: "${bookData.bookId}",
        authors: "${bookData.authors.join(', ')}",
        title: "${bookData.title}",
        description: "${bookData.description}",
        image: "${bookData.image}",
        link: "${bookData.link}"
      }) {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          title
          description
          image
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data.saveBook;
}

// Other API functions (e.g., removeBook, etc.) can be added here.
