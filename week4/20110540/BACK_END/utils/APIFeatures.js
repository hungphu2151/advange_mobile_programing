class UserAPIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const search = this.queryStr.search ? {
            $or: [
                {
                    first_name: {
                        $regex: this.queryStr.search,
                        $options: 'i'
                    }
                },
                {
                    last_name: {
                        $regex: this.queryStr.search,
                        $options: 'i'
                    }
                }
            ]
        } : {}

        this.query = this.query.find({ ...search });
        //console.log(this.query)
        return this;
    }

    pagination(size) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = size * (currentPage - 1);

        this.query = this.query.limit(size).skip(skip);
        return this;
    }
}

class PostAPIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    pagination(size) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = size * (currentPage - 1);

        this.query = this.query.limit(size).skip(skip);
        return this;
    }
}

function extractSortQuery(sortField) {
    const [field, order] = sortField.split(',');
    if (field && order) {
        return { [field]: order === 'desc' ? -1 : 1 };
    }
    return null;
}

module.exports = {
    UserAPIFeatures,
    PostAPIFeatures
}