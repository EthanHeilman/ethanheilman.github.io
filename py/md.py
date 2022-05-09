import markdown, os
from pathlib import Path
import urllib.request


def read_file(path_to_file):
    with open(path_to_file, 'r', encoding="utf8") as f:
        return f.read()

def write_file(path_to_file, data):
    with open(path_to_file, 'w', encoding="utf8") as f:
        f.write(data)

def empty(str):
    return str == False

md = markdown.Markdown(extensions=['footnotes','md_in_html'])

def HLinkToHTML(hlink):
    if hlink == None:
        return "NULL"
    else:
        return "<a href=\"{href}\">{text}</a> </p>".format(href = hlink.link, text = hlink.text)

class HLink:
    def __init__(self, text, link):
        self.text = text
        self.link = link

    def md_link(self):
        return "[{0}]({1})".format(self.text, self.link)

class Posts:
    def __init__(self, a, z):
        assert(a == 0) # next and prev links does not handle not starting at 0
        self.a = a
        self.z = z
        self.post_d = {}
    
    def add_post(self, p):
        if isinstance(p, Post):
            self.post_d[p.i] = p

    def build_posts(self):
        for i in range(self.a, self.z):
            p = self.post_d[i]
            
            next_link = None
            if i+1 < self.z:
                next_p = self.post_d[i+1]
                next_path = next_p.path_to_post
                next_link = HLink(next_p.post_title, Path("..", next_p.i_str, "index.html"))

            prev_link = None
            if 0 < i :
                prev_p = self.post_d[i-1]
                prev_path = prev_p.path_to_post
                prev_link = HLink(prev_p.post_title, Path("..", prev_p.i_str, "index.html"))

            p.write_page(next_link, prev_link)
    
    def build_directory(self):
        postlist = [self.post_d[i] for i in range(self.a, self.z)]
        # print(dir_html_template(postlist))
        ls_path = Path("..", "x", "ls", "index.html")
        write_file(ls_path, dir_html_template(postlist))
        # for i in range(self.a, self.z):
        #     print (i, self.post_d[i].post_title)




def header_template():
    page_header = "<div class='box_container'>\n"
    page_header += "<div class='text_container'>\n"
    page_header += "<h2><a href='../../index.html'>Ethan Heilman</a></h2><br\>"
    page_header += "<a href='../../index.html'>Main</a> || <a href='../ls/index.html'>Writing</a>"
    page_header += "<br/>"
    page_header += "<br/>"
    page_header += "<hr/>\n"  
    page_header += "</div>\n"
    page_header += "</div>\n"

    return page_header


def dir_html_template(posts):
    html_post_discription = "<tr>"
    html_post_discription += "<td class='td_index'>{i}</td> <td class='td_pubdate'>{strpubdate}</td> <td  <td class='td_title'><a href=\"{strlink}\">{strtitle}</a></td>\n"
    html_post_discription += "</tr>"


    html_dir_template  = "<!DOCTYPE html><html><head>"
    html_dir_template += "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>"
    html_dir_template += "<LINK href=\"..\..\style\style.css\" rel=\"stylesheet\" type=\"text/css\">"
    html_dir_template += "<title>Ethan Heilman: Writing</title>"
    html_dir_template += "</head>\n"
    html_dir_template += "<body>\n"
    html_dir_template += header_template()
    html_dir_template += "<div class='box_container'>\n"
    html_dir_template += "<div class='text_container'>\n"
    html_dir_template += "<h1>Writing</h1>"
    html_dir_template += "<hr />"
    html_dir_template += "<table>"
    html_dir_template += "<tr><th>Index</th><th>Pub date</th><th>Title</th></tr>"

    for p in posts[::-1]:
        strlink = Path("..", str(p.i), "index.html")
        strpubdate = p.first_pub_date.split(" ")[0]
        html_dir_template += html_post_discription.format(i=p.i, strpubdate=strpubdate, strlink=strlink, strtitle=p.post_title)
    
    html_dir_template += "</table>"
    html_dir_template += "</div>\n"
    html_dir_template += "</div>\n"
    html_dir_template += "</body></html>"

    return html_dir_template




def post_html_template(title, pubdate, lastedit, next_post, prev_post, post):
    strpubdate = pubdate if not pubdate else "NULL"
    streditdate = lastedit + " (edited)" if lastedit != "" else ""
        
    html_post_template  = "<!DOCTYPE html><html><head>"
    html_post_template += "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>"
    html_post_template += "<LINK href=\"..\..\style\style.css\" rel=\"stylesheet\" type=\"text/css\">"
    
    # Mathjax
    html_post_template += "<script src=\"https://polyfill.io/v3/polyfill.min.js?features=es6\"></script>"
    html_post_template += "<script id=\"MathJax-script\" async src=\"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js\"></script>"
    html_post_template += "<script type=\"text/javascript\" src=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\"></script>"
    html_post_template += "<script type=\"text/x-mathjax-config\">{mjconfig}</script>"
    # html_post_template += " MathJax.Hub.Config({"
    # html_post_template += " tex2jax: {"
    # html_post_template += "        inlineMath: [['$','$'], ['\\(','\\)']],"
    # html_post_template += "        processEscapes: true "
    # html_post_template += "          } "
    # html_post_template += "}); "
    # html_post_template += "</script>"
    
    mathjaxconfig = """
        MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            processEscapes: true
        }
        });
    """

    html_post_template += "<title>{strtitle}</title></head>\n"
    html_post_template += "<body>\n"
    html_post_template += header_template()

    html_post_template += "<div class='box_container'>\n"
    html_post_template += "<div class='text_container'>\n"
    html_post_template += "<h1>{strtitle}</h1>"

    html_post_template += "<p>{strpubdate} {streditdate}</p>"
    html_post_template += "<hr />"
    html_post_template += "{strpost}"
    html_post_template += "<hr />"
    html_post_template += "</div>\n"
    html_post_template += "</div>\n"

    html_post_template += "<br/>\n"


    html_post_template += "<div class='box_container'>\n"
    html_post_template += "<div class='text_container'>\n"
    html_post_template +=  "<p>NEXT {strnextlink} </p><p>PREV {strprevlink} </p>"
    html_post_template += "</div>\n"
    html_post_template += "</body></html>"

    return html_post_template.format(strtitle=title, 
    strpubdate = pubdate, streditdate = streditdate, strpost=post, 
    mjconfig = mathjaxconfig,
    strnextlink=HLinkToHTML(next_post), strprevlink=HLinkToHTML(prev_post))

class Post:
    def __init__(self, i):
  
        self.i = i
        self.i_str = str(i)
        self.path_to_post = os.path.join("..", "x", self.i_str)
        print(i, self.i, self.path_to_post)


        print(self.path_to_post)
        self.create_needed_files()

        self.post_md_path = os.path.join(self.path_to_post, "post.md")
        self.post_html_path = os.path.join(self.path_to_post, "index.html")


        self.post_md = read_file(self.post_md_path)
        self.post_title = read_file(os.path.join(self.path_to_post, "meta", "title.txt"))
        self.first_pub_date = read_file(os.path.join(self.path_to_post, "meta", "first-pub.date"))
        self.last_edit_date = read_file(os.path.join(self.path_to_post, "meta", "last-edit.date"))

        # self.update_figs()

    def create_needed_files(self):
        os.makedirs(os.path.join(self.path_to_post), exist_ok=True)

        Path(self.path_to_post,  "post.md").touch()

        os.makedirs(os.path.join(self.path_to_post,  "meta"), exist_ok=True)
        os.makedirs(os.path.join(self.path_to_post,  "figs"), exist_ok=True)

        Path(self.path_to_post,  "meta", "blank.name").touch()
        Path(self.path_to_post,  "meta", "first-pub.date").touch()
        Path(self.path_to_post,  "meta", "last-edit.date").touch()
        Path(self.path_to_post,  "meta", "abstract.txt").touch()
        Path(self.path_to_post,  "meta", "title.txt").touch()
        Path(self.path_to_post,  "meta", "tags").touch()


        print(os.path.join(self.path_to_post,  "meta"))


    """
    Used to replace remote images with local images. Downloads the remote images into the figure directory and then updates the markdown image tag to point at the local image.
    """
    def update_figs(self):
        new_post_md = ""

        state = None
        fig_url = ""

        prev_ch = ""
        ch = ""
        for i in range(len(self.post_md)):
            prev_ch = ch
            ch = self.post_md[i]

            # print(ch, state)

            if state == None:
                if prev_ch+ch == "![":
                    state = "start_img"
            elif state == "start_img":
                if ch == "]":
                    state = "next_url"
            elif state == "next_url":
                if ch == "(":
                    state = "read_url"
            elif state == "read_url":
                if ch == ")":
                    print ("fig_url", fig_url)
                    if "media.tumblr.com" in fig_url:
                        fig_name = fig_url.split("/")[-1]
                        rel_fig_url = "figs"+"/"+fig_name

                        fig_file_path = Path(self.path_to_post,  "figs", fig_name)

                        print("downloading...", fig_url, rel_fig_url, fig_name, fig_file_path)
                        if not fig_file_path.exists():
                            with urllib.request.urlopen(fig_url) as response:
                                with open(fig_file_path, 'wb') as f:
                                    f.write(response.read())

                        #download to figs
                        new_post_md += rel_fig_url
                    else:
                        new_post_md += fig_url

                    fig_url = ""
                    state = None
                else:
                    fig_url += ch
                    continue
            
            new_post_md += ch

        if new_post_md != self.post_md:
            self.post_md = new_post_md
            write_file(self.post_md_path, new_post_md)
            

    def write_page(self, next_post, prev_post):

        html = md.convert(self.post_md)
        md.reset()

        page_text = post_html_template(self.post_title, self.first_pub_date, self.last_edit_date, next_post, prev_post, html)

        write_file(self.post_html_path, page_text)
        return page_text



def read_md_source(entry_path):
    return read_file(os.path.join(entry_path, "post.md"))

def get_title(entry_path):
    return read_file(os.path.join(entry_path, "meta", "title.txt"))



def rebuild_everything():
    a = 0
    z = 27
    vposts = Posts(a, z)


    for i in range(a, z):
        print(i)
        p = Post(i)
        vposts.add_post(p)

    vposts.build_posts()
    vposts.build_directory()

rebuild_everything()


# for i in range (0, 30):
#     i_str = format(i,"04X")
#     dir_path = Path("..", "x", i_str)
#     prev_path = Path("..", "x", str(i))
#     print(dir_path, prev_path)
#     os.rename(dir_path, prev_path)    

# for i in range (29, 42):
#     i_str = format(i,"04X")
#     dir_path = Path("..", "x", i_str)
#     prev_path = Path("..", "x", format(i-1,"04X"))
#     print(dir_path, prev_path)
#     os.rename(dir_path, prev_path)


# for loop
# read all Posts
# 

# create new post
# convert old post
# rewrite html