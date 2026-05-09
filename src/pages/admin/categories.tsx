import { useState } from "react";
import { initialCategories, Category, products as initialProducts } from "@/data/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, MoreVertical, FolderOpen, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteAttempt = (category: Category) => {
    const productsInCategory = products.filter((p) => p.category === category.name);
    if (productsInCategory.length > 0) {
      setErrorAlert(
        `Impossible de supprimer la catégorie "${category.name}". Elle contient encore ${productsInCategory.length} produit(s). Veuillez d'abord déplacer ou supprimer ces produits.`,
      );
    } else {
      setCategoryToDelete(category);
    }
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      toast.success("Catégorie supprimée avec succès");
      setCategoryToDelete(null);
    }
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCategory: Category = {
      id: `cat-${Math.random().toString(36).substring(7)}`,
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      image: formData.get("image") as string,
      description: formData.get("description") as string,
    };

    setCategories([...categories, newCategory]);
    setIsAddDialogOpen(false);
    toast.success("Catégorie ajoutée avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une catégorie..."
            className="pl-10 h-11 bg-card shadow-sm border-muted-foreground/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-11 shadow-sm">
              <Plus className="w-4 h-4" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddCategory}>
              <DialogHeader>
                <DialogTitle>Ajouter une catégorie</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle catégorie pour organiser vos produits.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Nom
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right font-medium">
                    Lien Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    className="col-span-3"
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right font-medium pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="col-span-3 min-h-[100px]"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-muted-foreground/10 bg-card overflow-hidden shadow-sm transition-all">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b-muted-foreground/10">
              <TableHead className="w-[100px] font-semibold py-4">Aperçu</TableHead>
              <TableHead className="font-semibold">Catégorie</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Description</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id} className="group border-b-muted-foreground/10">
                <TableCell className="py-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-14 h-14 rounded-xl object-cover border border-muted-foreground/10 shadow-sm transition-transform group-hover:scale-105"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{category.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{category.slug}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[400px] hidden md:table-cell">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 shadow-lg border-muted-foreground/10"
                    >
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit2 className="w-4 h-4 text-blue-500" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => handleDeleteAttempt(category)}
                      >
                        <Trash2 className="w-4 h-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCategories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed rounded-2xl bg-muted/10 border-muted-foreground/20">
          <FolderOpen className="w-16 h-16 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground font-semibold text-lg">Aucune catégorie</p>
          <p className="text-sm text-muted-foreground/60">
            Ajoutez votre première catégorie pour commencer.
          </p>
        </div>
      )}

      {/* Deletion Error Alert */}
      <AlertDialog open={!!errorAlert} onOpenChange={() => setErrorAlert(null)}>
        <AlertDialogContent className="border-destructive/20 shadow-2xl">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl">Action impossible</AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed">
              {errorAlert}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorAlert(null)} className="h-11">
              D'accord, j'ai compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Delete Alert */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la catégorie{" "}
              <span className="font-bold text-foreground">"{categoryToDelete?.name}"</span> ? Cette
              action supprimera également son lien avec la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
