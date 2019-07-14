const visitsForVisitor = (visits, id) => {
  return visits.filter(({ visitor }) => {
    return visitor && visitor === id;
  });
};

module.exports = { visitsForVisitor };
