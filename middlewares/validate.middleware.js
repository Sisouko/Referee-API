const validateArbitre = (req, res, next) => {
  const { nom, prenom, nationalite, confederation, categorie, experience, statut } = req.body;
  const errors = [];

  if (!nom) errors.push('nom is required');
  if (!prenom) errors.push('prenom is required');
  if (!nationalite) errors.push('nationalite is required');
  if (!confederation) errors.push('confederation is required');
  if (!categorie) errors.push('categorie is required');
  if (experience === undefined || experience === null) errors.push('experience is required');
  if (statut && !['actif','suspendu','blesse','retraite'].includes(statut)) {
    errors.push('statut must be one of: actif, suspendu, blesse, retraite');
  }
  // Validate enums (optional but good)
  const validConfederations = ['UEFA','CONMEBOL','CAF','AFC','CONCACAF','OFC'];
  if (confederation && !validConfederations.includes(confederation)) {
    errors.push('confederation must be one of: ' + validConfederations.join(', '));
  }
  const validCategories = ['central','assistant','VAR','AVAR','4e'];
  if (categorie && !validCategories.includes(categorie)) {
    errors.push('categorie must be one of: ' + validCategories.join(', '));
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const validateMatch = (req, res, next) => {
  const { equipeDomicile, equipeExterieur, stade, villeHote, dateMatch, phase } = req.body;
  const errors = [];
  if (!equipeDomicile) errors.push('equipeDomicile is required');
  if (!equipeExterieur) errors.push('equipeExterieur is required');
  if (!stade) errors.push('stade is required');
  if (!villeHote) errors.push('villeHote is required');
  if (!dateMatch) errors.push('dateMatch is required');
  if (!phase) errors.push('phase is required');
  const validPhases = ['Groupes','8e','4e','demi','finale'];
  if (phase && !validPhases.includes(phase)) {
    errors.push('phase must be one of: ' + validPhases.join(', '));
  }
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};

const validateAffectation = (req, res, next) => {
  const { arbitreId, matchId, role } = req.body;
  const errors = [];
  if (!arbitreId) errors.push('arbitreId is required');
  if (!matchId) errors.push('matchId is required');
  if (!role) errors.push('role is required');
  const validRoles = ['central','assistant','VAR','AVAR','4e'];
  if (role && !validRoles.includes(role)) {
    errors.push('role must be one of: ' + validRoles.join(', '));
  }
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};

module.exports = {
  validateArbitre,
  validateMatch,
  validateAffectation
};