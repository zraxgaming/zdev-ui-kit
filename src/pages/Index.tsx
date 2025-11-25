import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Database, Gauge, Wrench, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioItems, blogPosts, demos } from "@/lib/dummyData";

const services = [
  {
    icon: Code,
    title: "Custom Websites",
    description: "Beautiful, responsive websites tailored to your brand and business needs",
  },
  {
    icon: Gauge,
    title: "Dashboards",
    description: "Real-time analytics dashboards with powerful data visualization",
  },
  {
    icon: Database,
    title: "Inventory Systems",
    description: "Complete inventory management solutions with barcode scanning",
  },
  {
    icon: Zap,
    title: "Automation Scripts",
    description: "Python scripts to automate repetitive tasks and workflows",
  },
  {
    icon: Wrench,
    title: "Custom SaaS",
    description: "Full-featured SaaS applications built to your specifications",
  },
];

export default function Index() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="container py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Custom Software Solutions for Modern Businesses
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We build custom dashboards, inventory systems, automation tools, and licensed
              software tailored to your unique business needs.
            </p>
            <div className="flex gap-4">
              <Link to="/contact">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <Card className="p-6">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Gauge className="h-24 w-24 text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-24 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive software solutions for every business need
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="container py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">Recent work we're proud of</p>
          </div>
          <Link to="/portfolio">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.slice(0, 3).map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <Badge className="w-fit mb-2">{item.type}</Badge>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Demos Preview */}
      <section className="container py-24 bg-muted/50">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Interactive Demos</h2>
            <p className="text-muted-foreground">Try out our templates and solutions</p>
          </div>
          <Link to="/demos">
            <Button variant="outline">
              View All Demos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Card key={demo.id} className="hover:shadow-lg transition-shadow">
              <img
                src={demo.thumbnail}
                alt={demo.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <Badge className="w-fit mb-2">{demo.type}</Badge>
                <CardTitle>{demo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Demo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest from the Blog</h2>
            <p className="text-muted-foreground">Insights and tutorials</p>
          </div>
          <Link to="/blog">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container py-24 bg-muted/50">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>
              Get updates about new tools, projects, and industry insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="container py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a project in mind? Let's discuss how we can help
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Your name" />
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <Textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}

