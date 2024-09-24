const mapCardToModel = (Card) => {
    return {
        title: Card.title || "",
        subtitle: Card.subtitle || "",
        description: Card.description || "",
        phone: Card.phone || "",
        email: Card.email || "",
        web: Card.web || "",
        url: Card.image?.url || "",
        alt: Card.image?.alt || "",
        state: Card.address?.state || "",
        country: Card.address?.country || "",
        city: Card.address?.city || "",
        street: Card.address?.street || "",
        houseNumber: Card.address?.houseNumber || "",
        zip: Card.address?.zip || "",
    };
};

export default mapCardToModel;