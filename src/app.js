import React, {useEffect, useState} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards.component";
import useStyles from "./app.styles";

const alanKey = "8350170c454cb7201c5667fd38c7dce32e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const alanLogoSrc = 'https://alan.app/voice/images/previews/preview.jpg';
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
       if (command === 'newHeadlines') {
         setNewsArticles(articles);
         setActiveArticle(-1);
       } else if (command === 'highlight') {
         setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
       } else if (command === 'open') {
         const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
         const article = articles[parsedNumber - 1];

         if (parsedNumber > 20) {
           alanBtn().playText('Please try that again...');
         } else {
           window.open(`${article.url}`, "_blank");
           console.log(article.url);
           alanBtn().playText('Opening...');
         }
       }
     },
   });
 }, []);


  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo"/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
