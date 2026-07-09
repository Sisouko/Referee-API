function authorize(...rolesAutorises) {

    return function (req, res, next) {

        if (!req.user) {
            return res.status(401).json({
                Error : 'Utilisateur non authentifié.'
            })
        }

        const roleUtilisateur = req.user.roleUtilisateur
        if (!rolesAutorises.includes(roleUtilisateur)) {
            return res.status(403).json({
                Error: `Accès refusé. Rôle requis : ${rolesAutorises.join(' ou ')}. Votre rôle : ${roleUtilisateur}.`

            })
        }

        next()
    }
}

module.exports = authorize