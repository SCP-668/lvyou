var datalist = [{
  date: "May 13 2019",
  title: "长白山路线",
  sp: "/images/sp.mp4",
  img: "/images/view1.jpg",
  username: '青石',
  avatar: '/images/cookbook/pic-4.jpg',
  readingNum: 54,
  collectionNum: 4,
  commentNum: 10,
  upNum: 11,
  author: "作者：沙儿飞飞",
  dateTime: "5天前",
  detail: "详细内容11111111",
  cookId: 1,
  collectionStatus: true,
  upStatus: true,
  comments: [{
    username: '青石',
    avatar: '/images/cookbook/pic-4.jpg',
    create_time: '2019/04/10',
    content: {
      txt: '家是人生的起点，更是生命的港湾.家就像一滴晶莹露珠，滋润着每一颗干涸的心.',
      // "http://localhost:8080/test/images/android.png",
      img: ["/images/cook/pic-1.jpg", "/images/cook/pic-2.jpg",
        "/images/cook/pic-3.jpg"
      ],
      audio: null
    }
  }, {
    username: '水清',
    avatar: '/images/cookbook/avatar-2.png',
    create_time: '2019/04/10',
    content: {
      txt: '专属炒饭，抹不去妈妈大地般深厚的爱意。无论绿叶飘向哪里，那深沉的大地将永远是温暖的归宿。',
      img: [],
      audio: null,
    }
  },
  {
    username: '赤墨',
    avatar: '/images/cookbook/avatar-1.png',
    create_time: '2018/04/15',
    content: {
      txt: '角落中孤独的喘息，阴影下黯然的神伤，妈妈从不忽略，那么细心地疼爱，洒满我们心灵的每一点空间。',
      img: ["/images/cook/pic-4.jpg",],
      audio: null,
    }
  },
  {
    username: '林白',
    avatar: '/images/cookbook/avatar-4.png',
    create_time: '1000000181',
    content: {
      txt: '',
      img: [],
      audio: {
        url: "http://123",
        timeLen: 8
      },
    }
  }
  ],
  music: {
    url: "http://music.163.com/song/media/outer/url?id=108220.mp3",
    title: "鬼迷心窍-李宗盛",
    coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002xOmp62kqSic.jpg?max_age=2592000"
  }

},
{
  date: "Jan 9 2019",
  title: "白云山路线",
  img: "/images/view2.jpg",
  username: '蓝石',
  avatar: '/images/cookbook/pic-4.jpg',
  readingNum: 25,
  collectionNum: 8,
  commentNum: 4,
  upNum: 22,
  author: "咖啡悠",
  dateTime: "8天前",
  detail: "1.准备鲜枇杷\n2.去除果皮和果核用盐水浸泡五分钟\n3.将枇杷果肉用清水冲洗一遍倒入砂锅，放入冰糖\n4.加入小半碗清水\n5.大火烧开\n6.改中小火，用木勺子捣碎枇杷\n7.改小火熬制，熬制浓稠即可",
  cookId: 2,
  collectionStatus: true,
  upStatus: true,
  music: {
    url: "http://music.163.com/song/media/outer/url?id=27538254.mp3",
    title: "女儿情-万晓利",
    coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000004Wv5BO30pPc0.jpg?max_age=2592000"
  }

},
{
  date: "Jan 9 2018",
  title: "坑神山路线",
  img: "/images/view3.jpg",
  username: '红石',
  avatar: '/images/cookbook/pic-4.jpg',
  readingNum: 96,
  collectionNum: 7,
  commentNum: 4,
  upNum: 22,
  author: "咖啡悠",
  dateTime: "一年前",
  detail: "1.片好的鱼片加入盐巴，鸡精，料酒，地瓜粉腌制10分钟\n2.葱姜蒜芹菜切好\n3.剃下鱼骨头，大火烧开，下油，放生姜，鱼骨稍微煎香\n4.放入高汤，盐巴，料酒\n5.水开，放入腌制好的鱼片\n6.煮3分钟，放鸡精，白胡椒粉，芹蒜\n7.再煮1分钟，可口的鱼汤就做好啦",
  cookId: 3,
  collectionStatus: true,
  upStatus: true,
  music: {
    url: "http://music.163.com/song/media/outer/url?id=108119.mp3",
    title: "恋恋风尘-老狼",
    coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
  }

}
];
module.exports = {
  cooklist: datalist
}