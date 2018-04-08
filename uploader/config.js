var config = {
    dir: "uploads/",
    port: 8501,
    sizelimit: 150,  //In MB
    namelimit: "",   //^Regex skip
    filetypelimit: "",
    AESPassword: '~run2dahillz#!12300-1ax*EbAZ**~',
    fileMeta: {
       name: "Name",
       size: "MB",
       handle: "Handle",
       title: "Title",
       tags: [],
       description: "",
       videoid: -1,
       access: "url",
       thumbnails: []
    },
    metaurl: "http://mivid.co:8500/video-meta"
};

module.exports = config;
