const normalizeCard = card => ({
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
        url: card.url,
        alt: card.alt,
    },
    address: {
        state: card.state,
        country: card.country,
        city: card.city,
        street: card.street,
        houseNumber: card.houseNumber,
        zip: card.zip,
    },
});
export default normalizeCard;