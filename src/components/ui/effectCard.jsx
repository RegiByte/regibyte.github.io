import React from 'react';
import {Card} from "./card";
import {formatDate} from "../../utils/formatDate";

function EffectCard({url, title, date, description}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={url}>
          {title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={date}
          className="md:hidden"
          decorate
        >
          {formatDate(date)}
        </Card.Eyebrow>
        <Card.Description>{description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={date}
        className="mt-1 hidden md:block"
      >
        {formatDate(date)}
      </Card.Eyebrow>
    </article>
  );
}

export function EffectCardInline({url, title, date, description}) {
  return (
    <Card as="article">
      <Card.Title href={url}>
        {title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={date} decorate>
        {formatDate(date)}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default EffectCard;