const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const SALT_ROUNDS = 10

async function register(req, res) {
    try {
        const { nom, email, password, role } = req.body

        if (!nom || !email || !password) {
            return res.status(400).json({
                Error: 'Les champs nom, email et password sont obligatoires.'
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                Error : 'Le mot de passe doit contenir au moins 6 caractères.'
            })
        }

        const existant = await User.findOne({ where: { email } })
        if (existant) {
            return res.status(400).json({
                Error: 'Un utilisateur avec cet email existe déjà.'
            })
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS)

        const nouvelUtilisateur = await User.create({
            nom,
            email,
            password: hash,
            role: role || 'consultation',
        })

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            utilisateur: nouvelUtilisateur
        })
    } catch (err) {
        console.error('Erreur register:', err)
        res.status(500).json({ Error: 'Erreur serveur lors de la création du compte.'})
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                erreur: 'Email et password sont obligatoires.'
            });
        }

        const utilisateur = await User.scope('withPassword').findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(401).json({ erreur: 'Email ou mot de passe incorrect.' });
        }

        const motDePasseValide = await bcrypt.compare(password, utilisateur.password);

        if (!motDePasseValide) {
            return res.status(401).json({ erreur: 'Email ou mot de passe incorrect.' });
        }

        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(200).json({
            message: 'Connexion réussie ✅',
            token,
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                role: utilisateur.role
            }
        });
    } catch (err) {
        console.error('Erreur login:', err);
        res.status(500).json({ erreur: 'Erreur serveur lors de la connexion.' });
    }
}

// ──────────────────────────────────────────
//  GET /auth/me
//  Protégé — nécessite authenticate uniquement (tous rôles)
// ──────────────────────────────────────────
async function me(req, res) {
    try {
        const utilisateur = await User.findByPk(req.user.id);

        if (!utilisateur) {
            return res.status(404).json({ erreur: 'Utilisateur introuvable.' });
        }

        res.status(200).json({ utilisateur });

    } catch (err) {
        console.error('Erreur me:', err);
        res.status(500).json({ erreur: 'Erreur serveur.' });
    }
}

module.exports = { register, login, me };