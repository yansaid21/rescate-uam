import { User } from "../types/user"

export async function getInfoGames() {
  const LATEST_GAMES = "http://localhost:8000/api/institutions/1/users"

  const rawData = await fetch(LATEST_GAMES)
  const json = await rawData.json()

  const { data: { items } } = json

  return items.map((item: any) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } = item
    const { score } = criticScoreSummary

    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image: img
    }

  })

}

export async function getGameDetails(slug: Game['slug']) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  // const { score } = criticScoreSummary;

  // get the card image
  // const cardImage = images.find((image: any) => image.typeName === "cardImage");
  // const { bucketType, bucketPath } = cardImage;
  const img = ``;
  // const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  // const rawReviews = components[3].data.items;

  // get the reviews
  // const reviews = rawReviews.map((review: any) => {
  //   const { quote, date, publicationName, author } = review;
  //   return { quote, date, publicationName, author };
  // });

  return {
    img,
    title,
    slug,
    description
  };
}
