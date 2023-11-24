// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

export default function pagination(req, res, next) {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12

    const skip = (page - 1) * limit

    req.pagination = {
        page,
        limit,
        skip
    }

    next()
}